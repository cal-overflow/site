
sam deploy \
  -t $STACK_TEMPLATE_FILE \
  --stack-name $STACK_NAME \
  --config-file ./samconfig.toml \
  --region $REGION

npm ci
npm run generate

BUCKET=$(aws cloudformation describe-stacks --stack-name=$STACK_NAME --region $REGION --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)
aws s3 sync dist s3://$BUCKET
