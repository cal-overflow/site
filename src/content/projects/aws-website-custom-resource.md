---
id: 6
title: Custom::Resource
tags:
  - TODO
---

Whenever I want to deploy or delete a static website (such as this one) to AWS, there are manual steps that interrupt the CloudFormation (sam) process.

I should be able to leverage a CloudFormation custom resource to automate some of these tasks.

<!--more-->

### Tasks to automate

#### Stack creation
- [ ] Automate the DNS Validation that happens when provisioning ACM certificate.

#### Stack deletion
- [ ] Empty the bucket containing the static frontend bundle before CloudFormation attempts to delete the bucket.

