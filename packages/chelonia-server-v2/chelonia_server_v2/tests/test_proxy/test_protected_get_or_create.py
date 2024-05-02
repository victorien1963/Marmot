import pytest
from tag.models import Tag
from model_permission.proxy.protected_get_or_create import ProtectedGetOrCreate


class TestProtectedBulkCreate:
    @pytest.mark.django_db
    def test_newly_create(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user = parameterized_create_protected_tag_for_user("user", ["tag1", "tag2", "tag3"])

        # Act
        tag_objects, created = ProtectedGetOrCreate(user=user, source_model=Tag).protected_get_or_create(tag="tag4")

        # Assert
        assert tag_objects.tag == "tag4"
        assert created == True


    @pytest.mark.django_db
    def test_already_exist(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user = parameterized_create_protected_tag_for_user("user", ["tag1", "tag2", "tag3"])

        # Act
        tag_objects, created = ProtectedGetOrCreate(user=user, source_model=Tag).protected_get_or_create(tag="tag3")

        # Assert
        assert tag_objects.tag == "tag3"
        assert created == False
