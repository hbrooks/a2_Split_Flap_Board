#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AdvertismentControllerServiceStack } from '../lib/advertisment-controller-service-stack';


let tpiPublicInterviewId: string
if (process.env.TPI_PUBLIC_INTERVIEW_ID) {
    tpiPublicInterviewId = process.env.TPI_PUBLIC_INTERVIEW_ID
} else {
  throw new Error("TPI_PUBLIC_INTERVIEW_ID environment variable is not set.")
}

let boardManagementServiceUrl: string
if (process.env.BOARD_MANAGEMENT_SERVICE_URL) {
  boardManagementServiceUrl = process.env.BOARD_MANAGEMENT_SERVICE_URL
} else {
  throw new Error("BOARD_MANAGEMENT_SERVICE_URL environment variable is not set.")
}

const app = new cdk.App();
new AdvertismentControllerServiceStack(app, 'AdvertisementControllerStack', tpiPublicInterviewId, boardManagementServiceUrl, {
    description: "Do not modify manually!  Stack contains the Split Flap Board used in interview #2.",
    tags: {
        'is_candidate_owned': 'true',
        'tpi_app_name': 'AdvertisementControllerService',
        'tpi_app_number': '2',
        'tpi_public_interview_id': tpiPublicInterviewId,
    },
    terminationProtection: false,
});
