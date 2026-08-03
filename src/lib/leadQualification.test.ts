import { describe, it, expect } from 'vitest';
import { qualifyLead } from './leadQualification';

describe('Lead Qualification Engine', () => {
  it('returns QUALIFIED if all checks pass', () => {
    const input = {
      phone: '9876543210',
      email: 'test@example.com',
      serviceInterest: 'Study Abroad',
      isDuplicate: false,
    };

    const result = qualifyLead(input);
    expect(result.flag).toBe('QUALIFIED');
    expect(result.reasons).toHaveLength(0);
  });

  it('returns UNVERIFIED with reason if phone is invalid', () => {
    const input = {
      phone: '123', // Invalid
      email: 'test@example.com',
      serviceInterest: 'Study Abroad',
      isDuplicate: false,
    };

    const result = qualifyLead(input);
    expect(result.flag).toBe('UNVERIFIED');
    expect(result.reasons).toContain('Invalid phone number format');
  });

  it('returns UNVERIFIED with reason if email is invalid', () => {
    const input = {
      phone: '9876543210',
      email: 'not-an-email', // Invalid
      serviceInterest: 'Study Abroad',
      isDuplicate: false,
    };

    const result = qualifyLead(input);
    expect(result.flag).toBe('UNVERIFIED');
    expect(result.reasons).toContain('Invalid email format');
  });

  it('returns UNVERIFIED with reason if service interest is missing', () => {
    const input = {
      phone: '9876543210',
      email: 'test@example.com',
      serviceInterest: '   ', // Empty
      isDuplicate: false,
    };

    const result = qualifyLead(input);
    expect(result.flag).toBe('UNVERIFIED');
    expect(result.reasons).toContain('Service interest is empty');
  });

  it('returns UNVERIFIED with reason if lead is a duplicate', () => {
    const input = {
      phone: '9876543210',
      email: 'test@example.com',
      serviceInterest: 'Study Abroad',
      isDuplicate: true, // Duplicate
    };

    const result = qualifyLead(input);
    expect(result.flag).toBe('UNVERIFIED');
    expect(result.reasons).toContain('Duplicate submission detected');
  });

  it('returns UNVERIFIED with multiple reasons if multiple checks fail', () => {
    const input = {
      phone: '123',
      email: 'not-an-email',
      serviceInterest: '',
      isDuplicate: true,
    };

    const result = qualifyLead(input);
    expect(result.flag).toBe('UNVERIFIED');
    expect(result.reasons).toHaveLength(4);
  });
});
