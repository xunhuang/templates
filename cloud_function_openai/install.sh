#!/bin/bash

# Check for required environment variables
if [ -z "$OPENAI_API_KEY" ]; then
    echo "Error: OPENAI_API_KEY environment variable is not set"
    exit 1
fi

npm install
gcloud secrets create OPENAI_API_KEY --replication-policy=automatic 

# must be bash and not sh, otherwise the echo -n will not work
echo -n $OPENAI_API_KEY | gcloud secrets versions add OPENAI_API_KEY --data-file=-

echo "Don't forget to change the deployment function name in package.json where it says testme001"
