import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * Stack containing IAM resources
 * @class IamStack
 */
export class IamStack extends cdk.Stack {
  /**
   * Developer group with restricted permissions
   */
  public readonly developersGroup: iam.Group;
  
  /**
   * Admin group with elevated permissions
   */
  public readonly adminGroup: iam.Group;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Create developers group with read-only access
     */
    this.developersGroup = new iam.Group(this, 'DevelopersGroup', {
      groupName: 'Developers'
    });
    
    this.developersGroup.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess')
    );

    /**
     * Create admins group with full access
     */
    this.adminGroup = new iam.Group(this, 'AdminGroup', {
      groupName: 'Administrators'
    });
    
    this.adminGroup.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')
    );

    /**
     * Create example user
     */
    const exampleUser = new iam.User(this, 'ExampleUser', {
      userName: 'example-user',
      groups: [this.developersGroup]
    });
  }
}
