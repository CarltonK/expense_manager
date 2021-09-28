echo
echo "************************"
echo "* Deploy application *"
echo "************************"
echo

gcloud run deploy \
    $1 \
    --image gcr.io/$2/$1:latest \
    --region $3 \
    --platform managed \
    --add-cloudsql-instances $4
