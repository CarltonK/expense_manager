echo
echo "************************"
echo "* Install dependencies *"
echo "************************"
echo

cd /workspace
npm i

echo
echo "************************"
echo "* Lint application *"
echo "************************"
echo

npm run lint

echo
echo "************************"
echo "* Variable subsitituion *"
echo "************************"
echo

awk '{gsub(/<DATABASE_URL>/,"'$1'")}1' .env > tmp.env && mv tmp.env .env

echo
echo "************************"
echo "* Build application *"
echo "************************"
echo

npm run build