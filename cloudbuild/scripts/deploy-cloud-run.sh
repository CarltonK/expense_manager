echo
echo "************************"
echo "* Deploy application *"
echo "************************"
echo

gcloud run deploy \
    $1 \
    --image gcr.io/$2/$1:$3 \
    --region $4 \
    --platform managed \
    --add-cloudsql-instances $5
