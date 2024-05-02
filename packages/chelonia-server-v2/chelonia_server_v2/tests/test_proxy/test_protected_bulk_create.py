import pytest
from chelonia_account.models import User
from tag.models import Tag
from model_permission.proxy.protected_bulk_create import ProtectedBulkCreate


class TestProtectedBulkCreate:

    @pytest.mark.django_db
    def test_create_multiple_object(self):
        # Arrange
        user = User.objects.create(username="user")
        tags = [ Tag(tag=tag) for tag in ["tag1", "tag2", "tag3"]]

        # Act
        tag_objects = ProtectedBulkCreate(user=user, source_model=Tag).protected_bulk_create(tags)

        # Assert
        assert len(tag_objects) == 3
