import pytest
from tag.models import Tag
from model_permission.proxy.protected_filter import ProtectedFilter


class TestProtectedFilter:

    @pytest.mark.django_db
    def test_get_single_object(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user = parameterized_create_protected_tag_for_user("user", ["tag",])

        # Act
        target_tags = ProtectedFilter(user=user, source_model=Tag).protected_filter(tag="tag")

        # Assert
        assert len(target_tags) == 1
        assert target_tags[0].tag == "tag"

    @pytest.mark.django_db
    def test_create_for_different_users(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user1 = parameterized_create_protected_tag_for_user("user1", ["tag1", "tag2"])
        user2 = parameterized_create_protected_tag_for_user("user2", ["tag3"])

        # Act
        target_tags_for_user1 = ProtectedFilter(user=user1, source_model=Tag).protected_filter().all().only("tag")
        target_tags_for_user2 = ProtectedFilter(user=user2, source_model=Tag).protected_filter().all()

        # Assert
        assert len(target_tags_for_user1) == 2
        assert len(target_tags_for_user2) == 1

    @pytest.mark.django_db
    def test_get_data_of_others(self, parameterized_create_protected_tag_for_user):
        # Arrange
        user1 = parameterized_create_protected_tag_for_user("user1", ["tag1", "tag2"])
        user2 = parameterized_create_protected_tag_for_user("user2", ["tag3"])

        tag3 = ProtectedFilter(user=user2, source_model=Tag).protected_filter().get(tag="tag3")
        fetch_tag3_in_user1 = ProtectedFilter(user=user1, source_model=Tag).protected_filter(tag_id=tag3.tag_id)

        # Assert
        assert len(fetch_tag3_in_user1) == 0
