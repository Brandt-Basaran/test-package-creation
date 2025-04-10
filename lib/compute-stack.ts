import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

/**
 * Stack containing EC2 and VPC resources
 * @class ComputeStack
 */
export class ComputeStack extends cdk.Stack {
  /**
   * The VPC where resources are deployed
   */
  public readonly vpc: ec2.Vpc;
  
  /**
   * The bastion host EC2 instance
   */
  public readonly bastionHost: ec2.Instance;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Create VPC with public and private subnets
     */
    this.vpc = new ec2.Vpc(this, 'MainVPC', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24,
        }
      ]
    });

    /**
     * Create bastion host security group
     */
    const bastionSG = new ec2.SecurityGroup(this, 'BastionSG', {
      vpc: this.vpc,
      description: 'Security group for bastion host',
      allowAllOutbound: true
    });
    bastionSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH access'
    );

    /**
     * Create bastion host EC2 instance
     */
    this.bastionHost = new ec2.Instance(this, 'BastionHost', {
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      securityGroup: bastionSG,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      })
    });
  }
}
