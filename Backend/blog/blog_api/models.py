from django.db import models
from datetime import date
from django.utils import timezone

# today = date.today()

# Create your models here.
class BlogData(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=5000000000)
    tag= models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    date =  models.DateField(auto_now=True)
    image = models.ImageField(upload_to='images/', default='images/default.jpg', blank=True, null=True)
    
    def __str__(self):
        return self.title
    
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    subject = models.CharField(max_length=100)
    message = models.CharField(max_length=5000000000)
    
    def __str__(self):
        return self.email
    