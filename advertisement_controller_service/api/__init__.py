import logging
import os

from flask import Flask
from flask import request

from .board_management_service_client import BoardManagementServiceClient

board_management_service_client = BoardManagementServiceClient(os.environ["BOARD_MANAGEMENT_SERVICE_URL"])


LOG = logging.getLogger()
LOG.setLevel(logging.INFO)


app = Flask(__name__)


@app.route("/health", methods=["GET"])
def handle_health_check():
    return {
        "isHealthy": True,
        "boardManagementServiceHealth": board_management_service_client.get_health(),
    }, 200


@app.route("/boards/<board_id>", methods=["GET"])
def get_board(board_id: str):
    raise NotImplementedError


@app.route("/ad", methods=["POST"])
def create_advertisement():
    request_body = request.json()
    raise NotImplementedError
