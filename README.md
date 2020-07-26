## Create Stack
`aws cloudformation update-stack --stack-name mosaic-aws-poc --template-body file:///home/sbeugen/Projects/comsysto/less/mosaic-aws-poc/infrastructure-as-code/cicd.yaml --profile private --parameters ParameterKey=GitHubToken,ParameterValue=<GitHubToken> --capabilities CAPABILITY_NAMED_IAM`
