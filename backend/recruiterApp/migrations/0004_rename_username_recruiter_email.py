# Generated by Django 3.2.6 on 2021-08-29 06:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recruiterApp', '0003_rename_email_recruiter_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recruiter',
            old_name='username',
            new_name='email',
        ),
    ]
