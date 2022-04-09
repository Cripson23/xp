from rest_framework import serializers

from .models import Objects


class ObjectsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Objects
        fields = ('idObject', 'nameObject', 'descriptionObject', 'xObject', 'yObject')
