from django.http import JsonResponse
from django.shortcuts import render
from flask import Response
from rest_framework import viewsets
from .serializers import LineSerializers
from .models import Line
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

class LineView(viewsets.ModelViewSet):
    serializer_class = LineSerializers
    queryset = Line.objects.all()

@api_view(['GET','POST'])
def line_id(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        try:
            ids = Line.objects.filter()
            serializer = LineSerializers(ids,many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Line.DoesNotExst:
            return Response(status=status.HTTP_404_NOT_FOUND)
    # if request.method == 'POST':
    #     data1 = JSONParser().parse(request)
    #     serial = LineSerializers(data=data1)
    #     if serial.is_valid():
    #         serial.save()
    #         return JsonResponse(serial.data,status=status.HTTP_201_CREATED)
    #     return JsonResponse(serial.errors, status=status.HTTP_400_BAD_REQUEST)