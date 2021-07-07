import * as path from 'path';


import * as cdk from "@aws-cdk/core";
import { EcrImageCode, Handler, Runtime, Function } from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';


export class AdvertismentControllerServiceStack extends cdk.Stack {

  constructor(scope: cdk.App, id: string, disambiguator: string, boardManagementServiceUrl: string, props?: cdk.StackProps) {
    const serviceName = 'AdControllerService'
    super(scope, id + '-' + disambiguator, props);

    const lambdaImage = EcrImageCode.fromAssetImage(path.join(__dirname, '..', 'advertisement_controller_service'));

    const handler = new Function(this, "Lambda", {
      code: lambdaImage,
      handler: Handler.FROM_IMAGE,
      runtime: Runtime.FROM_IMAGE,
      environment: {
        BOARD_MANAGEMENT_SERVICE_URL: boardManagementServiceUrl
      }
    });

    const api = new apigateway.RestApi(this, "Rest API GW", {
      restApiName: serviceName + '-' + disambiguator,
      description: "Don't modify manually!  Automatically created by CDK via a push to GitHub."
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    const apiGwProxyResource = new apigateway.Resource(this, 'ApiGatewayResource', {
      parent: api.root,
      pathPart: '{proxy+}'
    })
    apiGwProxyResource.addMethod('ANY', lambdaIntegration)

    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url
    });

  }


}
