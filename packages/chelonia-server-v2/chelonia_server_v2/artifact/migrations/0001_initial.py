# Generated by Django 5.0.3 on 2024-04-17 23:02

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artifact',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(null=True)),
                ('artifact_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('path', models.TextField()),
                ('artifact_format', models.CharField(max_length=32)),
                ('artifact_size', models.BigIntegerField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ExportedArtifact',
            fields=[
                ('artifact_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='artifact.artifact')),
                ('expires_at', models.DateTimeField()),
            ],
            options={
                'abstract': False,
            },
            bases=('artifact.artifact',),
        ),
    ]
