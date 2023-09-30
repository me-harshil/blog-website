from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.utils import timezone
from django.http import HttpResponseForbidden


# Create your views here.
class Blog(APIView):
    # Fetch all blogs
    def get(self, request):
        b = request.GET.get('tag')
        if b:
            blog_objs = BlogData.objects.filter(tag__icontains=b)
        else:
            blog_objs = BlogData.objects.all().order_by('-id')
        serializer = BlogSerializer(blog_objs, many=True)
        return Response(serializer.data, status=200)

    # Create a blog
    def post(self, request):
        email = request.headers.get('user-email')
        if email == 'hello@hello.com':
            if 'image' in request.FILES:
                # Handle form data with image upload
                serializer = BlogCreateSerializer(
                    data=request.data, context={'request': request})
            else:
                serializer = BlogCreateSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({"data": serializer.data, "message": "blog create successfully"}, status=201)
            return Response(serializer.errors, status=400)
        else:
            return HttpResponseForbidden('Access denied')

    # Update a blog
    def put(self, request, id):
        try:
            blog_obj = BlogData.objects.get(id=id)
            serializer = BlogCreateSerializer(blog_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"data": serializer.data, "message": "blog updated successfully"}, status=200)
            return Response(serializer.errors, status=400)
        except:
            return Response({"message": "blog not found"}, status=404)

    # Delete a blog
    def delete(self, request, id):
        try:
            blog_obj = BlogData.objects.get(id=id)
            blog_obj.delete()
            return Response({"message": "blog deleted successfully"}, status=200)

        except:
            return Response({"message": "blog not found"}, status=404)


class BlogById(APIView):
    # Fetch a blog by id
    def get(self, request, id):
        try:
            blog_obj = BlogData.objects.get(id=id)
            serializer = BlogSerializer(blog_obj)
            return Response(serializer.data, status=200)
        except:
            return Response({"message": "blog not found"}, status=404)


class Contact(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data, "message": "contact create successfully"}, status=201)
        return Response(serializer.errors, status=400)
