# Generated by Django 5.0.3 on 2024-04-18 14:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gpt', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuizTry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('quizLevel', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.CharField(max_length=255)),
                ('orderNum', models.IntegerField(db_column='order_num')),
                ('feedback', models.TextField(max_length=255, null=True)),
                ('score', models.IntegerField(null=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='gpt.gptquestionanswer')),
            ],
        ),
    ]
