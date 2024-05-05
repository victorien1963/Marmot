import pytest
from tag.models import Tag
from model_permission.proxy.protected_update_or_create import ProtectedUpdateOrCreate


class TestProtectedBulkCreate:
    @pytest.mark.django_db
    def test_update_exist(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user = parameterized_create_protected_tag_for_user("user", ["tag1", "tag2", "tag3"])

        # Act
        tag_objects, created = ProtectedUpdateOrCreate(user=user, source_model=Tag) \
            .protected_update_or_create(tag="tag3", defaults={"tag": "tag4"}, create_defaults={"tag": "tag4"})

        # Assert
        assert tag_objects.tag == "tag4"
        assert created == False


    @pytest.mark.django_db
    def test_newly_create(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user = parameterized_create_protected_tag_for_user("user", ["tag1", "tag2", "tag3"])

        # Act
        tag_objects, created = ProtectedUpdateOrCreate(user=user, source_model=Tag) \
            .protected_update_or_create(tag="tag4", defaults={"tag": "tag5"}, create_defaults={"tag": "tag5"})

        # Assert
        assert tag_objects.tag == "tag5"
        assert created == True
