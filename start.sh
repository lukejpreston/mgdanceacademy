find ../you_eye/ | entr ./update.sh > /dev/null 2>&1 &
find . -type f \( -name "*.yml" \) | entr ./serve.sh