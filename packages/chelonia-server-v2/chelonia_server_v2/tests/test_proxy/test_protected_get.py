import pytest
from tag.models import Tag
from model_permission.proxy.protected_get import ProtectedGet
from django.core.exceptions import ObjectDoesNotExist


class TestProtectedFilter:

    @pytest.mark.django_db
    def test_get_single_object(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user = parameterized_create_protected_tag_for_user("user", ["tag",])

        # Act
        target_tag = ProtectedGet(user=user, source_model=Tag).protected_get(tag="tag")

        # Assert
        assert target_tag.tag == "tag"

    @pytest.mark.django_db
    def test_create_for_different_users(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user1 = parameterized_create_protected_tag_for_user("user1", ["tag1", "tag2"])
        user2 = parameterized_create_protected_tag_for_user("user2", ["tag3"])

        # Act
        target_tag_for_user2 = ProtectedGet(user=user2, source_model=Tag).protected_get(tag="tag3")

        # Assert
        assert target_tag_for_user2.tag == "tag3"

    @pytest.mark.django_db
    def test_get_data_of_others(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user1 = parameterized_create_protected_tag_for_user("user1", ["tag1", "tag2"])
        user2 = parameterized_create_protected_tag_for_user("user2", ["tag3"])

        tag3 = ProtectedGet(user=user2, source_model=Tag).protected_get(tag="tag3")

        # Assert, Act
        with pytest.raises(ObjectDoesNotExist) as exec_info:
            ProtectedGet(user=user1, source_model=Tag).protected_get(tag_id=tag3.tag_id)

        assert str(exec_info.typename) == "DoesNotExist"
        assert str(exec_info.value) == "Tag matching query does not exist."