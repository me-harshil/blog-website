from django.contrib import admin
from blog_api.models import BlogData, Contact

# Register your models here.
admin.site.register(BlogData)
admin.site.register(Contact)
# class ImageAdmin(admin.ModelAdmin):
#     list_display = ('id', 'image')
