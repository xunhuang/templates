#!/bin/bash
gcloud functions deploy testme001 \
    --entry-point=main_entrypoint \
    --runtime nodejs18 \
    --trigger-http \
    --allow-unauthenticated \
    --set-secrets OPENAI_API_KEY=OPENAI_API_KEY:latest
