# Generated by Django 5.0.3 on 2024-04-17 23:02

import django.db.models.deletion
import django.db.models.fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('artifact', '0001_initial'),
        ('clip', '0001_initial'),
        ('footage', '0001_initial'),
        ('subtitle', '0001_initial'),
        ('tag', '0001_initial'),
        ('video', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ProtectedArtifact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='artifact.artifact')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedClip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='clip.clip')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedClipExportingTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='clip.clipexportingtask')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedClipSubtitleExportingTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='subtitle.clipsubtitleexportingtask')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedClipTagMap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='clip.cliptagmap')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedExportedArtifact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='artifact.exportedartifact')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedExportedClipMap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='clip.exportedclipmap')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedExportedClipSubtitle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='subtitle.exportedclipsubtitle')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedExportedVideoSubtitle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='subtitle.exportedvideosubtitle')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedSubtitle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='subtitle.subtitle')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedSubtitleGenerationTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='subtitle.subtitlegenerationtask')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='tag.tag')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedTransitionAnimation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='footage.transitionanimation')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedTransitionAnimationUploadingTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='footage.transitionanimationuploadingtask')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='video.video')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedVideoSubtitleExportingTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='subtitle.videosubtitleexportingtask')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedVideoTagMap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='video.videotagmap')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedVideoUploadingTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='video.videouploadingtask')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedWatermark',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='footage.watermark')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtectedWatermarkUploadingTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='footage.watermarkuploadingtask')),
                ('user', models.ForeignKey(on_delete=django.db.models.fields.CharField, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
