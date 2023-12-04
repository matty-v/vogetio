#!/bin/bash

gcloud functions deploy Notion-Blog-Service \
--gen2 \
--trigger-http \
--region=us-central1 \
--runtime=nodejs20 \
--entry-point=blogService \
--memory=1024M \
--allow-unauthenticated \
--set-env-vars \
NOTION_API_KEY="$NOTION_API_KEY",\
NOTION_BLOG_DB_ID="$NOTION_BLOG_DB_ID"
