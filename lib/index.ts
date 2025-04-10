import { Construct } from "constructs";
import { aws_s3 } from "aws-cdk-lib";

interface SimpleBucketProps {
    bucketName: string;
}

export class SimpleBucket extends Construct {
    public readonly bucket: aws_s3.Bucket;

    constructor(scope: Construct, id: string, props: SimpleBucketProps) {
        super(scope, id);
        this.bucket = new aws_s3.Bucket(this, 'XXXXXX', {
            bucketName: props.bucketName
        });
    }
}
