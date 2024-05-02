import pytest
from chelonia_account.models import User
from tag.models import Tag
from model_permission.proxy.protected_create import ProtectedCreate


class TestProtectedCreate:
    @pytest.mark.django_db
    def test_create_single_object(self):
        # Arrange
        user = User.objects.create(username="user")

        # Act
        tag = ProtectedCreate(user=user, source_model=Tag).protected_create(tag="tag")

        # Assert
        assert tag.tag == "tag"
