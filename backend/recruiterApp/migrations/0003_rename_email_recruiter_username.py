# Generated by Django 3.2.6 on 2021-08-29 06:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recruiterApp', '0002_recruiter'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recruiter',
            old_name='email',
            new_name='username',
        ),
    ]
