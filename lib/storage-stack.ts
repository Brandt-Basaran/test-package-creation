import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

/**
 * Stack containing S3 bucket resources
 * @class StorageStack
 */
export class StorageStack extends cdk.Stack {
  /**
   * The primary data bucket
   */
  public readonly dataBucket: s3.Bucket;
  
  /**
   * The logging bucket for access logs
   */
  public readonly logBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Bucket for storing access logs
     */
    this.logBucket = new s3.Bucket(this, 'XXXXXXXXXXXXX', {
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(90),
          transitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: cdk.Duration.days(30),
            }
          ]
        }
      ]
    });

    /**
     * Main data storage bucket
     */
    this.dataBucket = new s3.Bucket(this, 'XXXXXXXXXX', {
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      serverAccessLogsBucket: this.logBucket,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    });
  }
}
