from mailbox import linesep
from rest_framework import serializers
from .models import Line

class LineSerializers(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = ('id','geometry','wear','weather','vegetation')