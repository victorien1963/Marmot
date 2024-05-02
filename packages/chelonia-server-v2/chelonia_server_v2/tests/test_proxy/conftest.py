import pytest

from chelonia_account.models import User
from tag.models import Tag
from typing import List, Callable, Any
from model_permission.models import ProtectedTag


def create_protected_tag_for_user(user_name: str, tag_list: List[str]) -> User:
    user = User.objects.create(username=user_name)

    tag_objects = [Tag(tag=tag) for tag in tag_list]
    Tag.objects.bulk_create(tag_objects)

    protect_tag_objects = [ProtectedTag(user=user, target=tag_object) for tag_object in tag_objects]
    ProtectedTag.objects.bulk_create(protect_tag_objects)

    return user


@pytest.fixture
def parameterized_create_protected_tag_for_user() -> Callable[[Any, Any], User]:
    return lambda user_name, tag_list: create_protected_tag_for_user(user_name, tag_list)