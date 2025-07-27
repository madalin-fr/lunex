#!/usr/bin/env python3
"""
Script to create .env.local.example from .env.local
Replaces sensitive values with placeholder text for safe version control
"""

import os
import re
import sys
from pathlib import Path

def main():
    # File paths
    project_root = Path.cwd()
    env_file = project_root / '.env.local'
    example_file = project_root / '.env.local.example'
    
    # Check if .env.local exists
    if not env_file.exists():
        print("❌ .env.local file not found!")
        sys.exit(1)
    
    print("📖 Reading .env.local...")
    
    # Read the original file
    with open(env_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Define replacement patterns
    replacements = [
        # Generic API keys and tokens
        (r'^(.*API_KEY=)(.+)$', r'\1YOUR_API_KEY_HERE'),
        (r'^(.*TOKEN=)(.+)$', r'\1your_token_here'),
        
        # Specific service replacements
        (r'^(NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=)(.+)$', r'\1YOUR_GOOGLE_MAPS_API_KEY_HERE'),
        (r'^(NEXT_PUBLIC_CAL_API_KEY=)(.+)$', r'\1your_cal_api_key_here'),
        (r'^(RESEND_API_KEY=)(.+)$', r'\1your_resend_api_key_here'),
        (r'^(GEMINI_API_KEY=)(.+)$', r'\1your_gemini_api_key_here'),
        (r'^(SANITY_API_TOKEN=)(.+)$', r'\1your_sanity_write_token_here'),
        
        # Cal.com specific patterns
        (r'^(NEXT_PUBLIC_CAL_USERNAME=)(.+)$', r'\1your-cal-username'),
        (r'^(NEXT_PUBLIC_CAL_LINK=)https://cal\.com/(.+)$', r'\1https://cal.com/your-cal-username'),
    ]
    
    # Apply all replacements
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
    
    # Add header comment
    header = """# Environment Variables Example
# Copy this file to .env.local and fill in your actual values
# DO NOT commit .env.local to version control!

"""
    
    final_content = header + content
    
    # Write the example file
    with open(example_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("✅ Successfully created .env.local.example")
    print(f"📁 Location: {example_file}")
    print()
    print("📝 Instructions:")
    print("1. Copy .env.local.example to .env.local")
    print("2. Replace placeholder values with your actual API keys/tokens")
    print("3. Never commit .env.local to version control")
    print()
    print("🚀 Usage:")
    print("   python scripts/create_env_example.py")

if __name__ == "__main__":
    main()