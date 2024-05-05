import requests
from utils.logger import DefaultLogger
from requests.exceptions import HTTPError


class APIClientBase:
    def __init__(self, url):
        self._url = url
        
    def get_by_condition(self, payload) -> dict:
        try:
            response = requests.get(self._url, params=payload)
            response.raise_for_status()
            DefaultLogger().info(
                f"Successfully make get request to {self._url}: {response.status_code} - {response.text}")
            return response.json()
        except HTTPError as e:
            DefaultLogger().error(f"Unexpected http response while retrieving making get response to {self._url}: {e} - {response.status_code} - {response.text}")
            raise e
        except Exception as e:
            DefaultLogger().error(f"Error occur while retrieving making get response to {self._url}: {e}")
            raise e

    @staticmethod
    def get_by_url(target_url) -> dict:
        try:
            response = requests.get(target_url)
            response.raise_for_status()
            DefaultLogger().info(
                f"Successfully make get request to {target_url}: {response.status_code} - {response.text}")
            return response.json()
        except HTTPError as e:
            DefaultLogger().error(f"Unexpected http response while retrieving making get response to {self._url}: {e} - {response.status_code} - {response.text}")
            raise e
        except Exception as e:
            DefaultLogger().error(f"Error occur while retrieving making get response to {target_url}: {e}")
            raise e
    
    @staticmethod
    def patch(object_url, payload):
        try:
            response = requests.patch(object_url, data=payload)
            response.raise_for_status()
            DefaultLogger().info(f"Response of making patch request to {object_url}: {response.status_code} - {response.text}")
        except HTTPError as e:
            DefaultLogger().error(f"Unexpected http response while making patch response to {object_url}: {e} - {response.status_code} - {response.text}")
            raise e
        except Exception as e:
            DefaultLogger().error(f"Error occur while making patch request to {object_url}: {e}")
            raise e
        
    def post(self, payload):
        try:
            response = requests.post(self._url, json=payload)
            response.raise_for_status()
            DefaultLogger().info(f"Response of making post request to {self._url}: {response.status_code} - {response.text}")
        except HTTPError as e:
            DefaultLogger().error(f"Unexpected http response while making post response to {self._url}: {e} - {response.status_code} - {response.text}")
            raise e
        except Exception as e:
            DefaultLogger().error(f"Error occur while making post request to {self._url}: {e}")
            raise e

    @staticmethod
    def delete(object_url):
        try:
            response = requests.delete(object_url)
            response.raise_for_status()
            DefaultLogger().info(f"Response of making delete request to {object_url}: {response.status_code} - {response.text}")
        except HTTPError as e:
            DefaultLogger().error(f"Unexpected http response while making delete response to {object_url}: {e} - {response.status_code} - {response.text}")
            raise e
        except Exception as e:
            DefaultLogger().error(f"Error occur while making post request to {object_url}: {e}")
            raise e
