# AWS CDK Resource Import & TypeDoc POC

This repository serves as a Proof of Concept (POC) for two distinct purposes:

1. Testing AWS CDK resource importing capabilities
2. Exploring TypeDoc documentation generation features

## Project Overview

The project contains several AWS CDK stacks demonstrating different resource types:

- **StorageStack**: S3 bucket configurations with logging
- **DatabaseStack**: DynamoDB tables for users and orders
- **ComputeStack**: EC2 instances and VPC networking
- **IamStack**: IAM users and group permissions

## Documentation

This project uses TypeDoc to generate comprehensive HTML documentation. The documentation includes:

- Detailed class and interface descriptions
- Method signatures and parameters
- Property definitions
- Type information
- Resource configurations

### Viewing Documentation

The HTML documentation can be viewed in two ways:

1. Locally: Open `docs/index.html` in your browser after running `npm run docs`
2. GitHub Pages: Visit the hosted documentation via GitHub Pages tab on repo host

### Generating Documentation

To generate the documentation:

```bash
npm run docs
