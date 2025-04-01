import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';

export interface SimpleBucketProps {
  bucketName: string;
}

export class SimpleBucket extends Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: SimpleBucketProps) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: props.bucketName
    });
  }
}
