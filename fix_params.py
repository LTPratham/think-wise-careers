import os
import re

directory = r'd:\projects\Think Wise Careers\think-wise-careers\src\app'

page_pattern = re.compile(r'({ params }\s*:\s*{\s*params:\s*{\s*([a-zA-Z0-9_]+)\s*:\s*string\s*}\s*})')
api_pattern = re.compile(r'\(\s*(req|request)\s*:\s*(Request|NextRequest)\s*,\s*{\s*params\s*}\s*:\s*{\s*params\s*:\s*{\s*([a-zA-Z0-9_]+)\s*:\s*string\s*}\s*}\s*\)')
api_context_use_pattern = re.compile(r'const\s*{\s*([a-zA-Z0-9_]+)\s*}\s*=\s*params\s*;')

files_changed = 0

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.ts', '.tsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            if 'route.ts' in file:
                content = api_pattern.sub(r'(\1: \2, context: { params: Promise<{ \3: string }> })', content)
                content = re.sub(r'const\s*{\s*([a-zA-Z0-9_]+)\s*}\s*=\s*params\s*;', r'const { \1 } = await context.params;', content)
            else:
                content = page_pattern.sub(r'{ params }: { params: Promise<{ \2: string }> }', content)
                content = re.sub(r'export default function (\w+)\(', r'export default async function \1(', content)
                content = re.sub(r'const\s*{\s*([a-zA-Z0-9_]+)\s*}\s*=\s*params\s*;', r'const { \1 } = await params;', content)
                content = re.sub(r'params\.([a-zA-Z0-9_]+)', r'(await params).\1', content)

            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {filepath}")
                files_changed += 1

print(f"Total files updated: {files_changed}")
