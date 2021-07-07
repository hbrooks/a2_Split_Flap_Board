from typing import List
from uuid import uuid4
from typing import Dict
from logging import getLogger


from requests import request


LOG = getLogger('BoardManagementServiceClient')


class BoardManagementServiceClient:
    def __init__(self, board_management_service_api_url: str):
        self.board_management_service_api_url: str = board_management_service_api_url


    def get_board(self, board_id: str) -> Dict:
        """
        Makes a `GET /boards/{boardId}` request for a given `boardId`.  If the response 
        code is not in the 200's or 300's, an exception is raised.
        """
        response = request(
            url=self.board_management_service_api_url + '/boards/' + board_id,
            method='GET',
            headers={
                'content-type': 'application/json'
            }
        )
        if response.ok:
            return response.json()
        else:
            LOG.error(r"Response from Board Management Service's GET /boards/{boardId} endpoint is not ok.")
            response.raise_for_status()


    def get_health(self) -> Dict:
        """
        Makes a `GET /health` request.  If the response 
        code is not in the 200 an exception is raised.
        """
        response = request(
            url=self.board_management_service_api_url + '/health',
            method='GET',
            headers={
                'content-type': 'application/json'
            }
        )
        if response.status_code == 200:
            return response.json()
        else:
            LOG.error(r"Response from Board Management Service's GET /health is not 200.")
            raise ValueError(response.text)