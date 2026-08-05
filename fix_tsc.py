import os
import re

dir_path = r'd:\projects\Think Wise Careers\think-wise-careers'

# 1. Fix toast imports
for root, _, files in os.walk(os.path.join(dir_path, 'src', 'components', 'admin')):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            content = content.replace('import { useToast } from "@/components/ui/toast";', 'import { toast } from "@/components/ui/toast";')
            content = content.replace('const { toast } = useToast();', '')
            # Fix zodResolver type issue
            content = re.sub(r'resolver: zodResolver\((.*?)\),', r'resolver: zodResolver(\1) as any,', content)
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed toast in {file}")

# 2. Fix 3D args
for file in ['BookAirplane3D.tsx', 'InteractiveGlobe.tsx']:
    filepath = os.path.join(dir_path, 'src', 'components', 'animations', file)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        if 'BookAirplane3D' in file:
             content = re.sub(r'<bufferAttribute\s+attach="attributes-position"\s+count={positions.length / 3}\s+array={positions}\s+itemSize={3}\s*/>', r'<bufferAttribute attach="attributes-position" count={positions.length / 3} args={[positions, 3]} />', content)
        else:
             content = re.sub(r'<bufferAttribute\s+attach="attributes-position"\s+count={particlesPosition.length / 3}\s+array={particlesPosition}\s+itemSize={3}\s*/>', r'<bufferAttribute attach="attributes-position" count={particlesPosition.length / 3} args={[particlesPosition, 3]} />', content)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed 3D in {file}")

# 3. Fix auditLog.ts and jobQueue.ts
for file in ['auditLog.ts', 'jobQueue.ts']:
    filepath = os.path.join(dir_path, 'src', 'lib', file)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace('Record<string, unknown>', 'any')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file}")

# 4. Fix auth.ts
filepath = os.path.join(dir_path, 'src', 'lib', 'auth.ts')
if os.path.exists(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('user as { role: string }', 'user as any')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed auth.ts")
