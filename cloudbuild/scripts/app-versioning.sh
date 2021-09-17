echo
echo "************************"
echo "* App versioning *"
echo "************************"
echo

awk '{gsub(/<SHORT_SHA>/,"'$1'")}1' /workspace/cloudbuild/cloudbuild.env >/workspace/tmp.env && mv /workspace/tmp.env /workspace/cloudbuild/cloudbuild.env