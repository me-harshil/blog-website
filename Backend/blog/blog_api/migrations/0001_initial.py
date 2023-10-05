# Generated by Django 4.1.10 on 2023-10-05 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BlogData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=5000000000)),
                ('tag', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=100)),
                ('date', models.DateField(auto_now=True)),
                ('image', models.ImageField(blank=True, default='images/default.jpg', null=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('subject', models.CharField(max_length=100)),
                ('message', models.CharField(max_length=5000000000)),
            ],
        ),
    ]
