import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkDuplicate, normalizePhone, normalizeEmail, isValidPhone, isValidEmail } from './leadDedup';
import { prisma } from './prisma';

// Mock prisma
vi.mock('./prisma', () => ({
  prisma: {
    lead: {
      findFirst: vi.fn(),
    },
  },
}));

describe('Lead Deduplication & Normalization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('normalizePhone', () => {
    it('strips non-digit characters', () => {
      expect(normalizePhone('+91 98765-43210')).toBe('9876543210');
      expect(normalizePhone('(123) 456-7890')).toBe('1234567890');
    });

    it('removes leading 91 (India country code) if > 10 digits', () => {
      expect(normalizePhone('919876543210')).toBe('9876543210');
      expect(normalizePhone('+91-98765-43210')).toBe('9876543210');
    });

    it('removes leading 0', () => {
      expect(normalizePhone('09876543210')).toBe('9876543210');
    });
  });

  describe('normalizeEmail', () => {
    it('lowercases and trims', () => {
      expect(normalizeEmail(' Test@Example.com ')).toBe('test@example.com');
    });
  });

  describe('isValidPhone', () => {
    it('returns true for 10 digit Indian mobile numbers (after normalization)', () => {
      expect(isValidPhone('+91 9876543210')).toBe(true);
      expect(isValidPhone('09876543210')).toBe(true);
      expect(isValidPhone('9876543210')).toBe(true);
    });

    it('returns false for invalid formats', () => {
      expect(isValidPhone('98765')).toBe(false);
      expect(isValidPhone('12345678901')).toBe(false); // 11 digits
      expect(isValidPhone('abc')).toBe(false);
    });
  });

  describe('checkDuplicate', () => {
    it('returns duplicate true and existing ID if phone matches within 30 days', async () => {
      const mockLead = { id: 'lead-123' };
      vi.mocked(prisma.lead.findFirst).mockResolvedValueOnce(mockLead as any);

      const result = await checkDuplicate('9876543210', 'test@test.com');
      
      expect(result.isDuplicate).toBe(true);
      expect(result.existingLeadId).toBe('lead-123');
      expect(prisma.lead.findFirst).toHaveBeenCalledTimes(1); // Phone matched, should not check email
    });

    it('returns duplicate true and existing ID if email matches within 30 days', async () => {
      const mockLead = { id: 'lead-456' };
      // Phone doesn't match, Email does
      vi.mocked(prisma.lead.findFirst)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockLead as any);

      const result = await checkDuplicate('9876543210', 'test@test.com');
      
      expect(result.isDuplicate).toBe(true);
      expect(result.existingLeadId).toBe('lead-456');
      expect(prisma.lead.findFirst).toHaveBeenCalledTimes(2);
    });

    it('returns duplicate false if neither matches', async () => {
      vi.mocked(prisma.lead.findFirst).mockResolvedValue(null);

      const result = await checkDuplicate('9876543210', 'test@test.com');
      
      expect(result.isDuplicate).toBe(false);
      expect(result.existingLeadId).toBeNull();
      expect(prisma.lead.findFirst).toHaveBeenCalledTimes(2);
    });
  });
});
