# Generated by Django 5.0.3 on 2024-04-17 23:02

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('artifact', '0001_initial'),
        ('tag', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoUploadingTask',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(null=True)),
                ('task_id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('description', models.TextField(blank=True, default='')),
                ('task_status', models.CharField(choices=[('CREATED', 'Created'), ('UPLOADING', 'Uploading'), ('UPLOADED', 'Uploaded'), ('MOVING', 'Moving'), ('FINISHED', 'Finished'), ('FAILED', 'Failed')], default='CREATED')),
                ('filename', models.TextField()),
                ('extension', models.CharField(max_length=32)),
                ('upload_path', models.TextField()),
                ('store_path', models.TextField()),
                ('upload_link', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(null=True)),
                ('video_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('description', models.TextField(blank=True, null=True)),
                ('taken_at', models.DateTimeField(blank=True, null=True)),
                ('location', models.TextField(blank=True, null=True)),
                ('duration', models.PositiveIntegerField(default=0)),
                ('source_artifact', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='artifact.artifact')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='VideoTagMap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source_tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tag.tag')),
                ('source_video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='video.video')),
            ],
        ),
    ]
