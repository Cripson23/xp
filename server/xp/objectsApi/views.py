from rest_framework import viewsets

from .serializers import ObjectsSerializer
from .models import Objects


class ObjectsViewSet(viewsets.ModelViewSet):
    queryset = Objects.objects.all().order_by('-idObject')
    serializer_class = ObjectsSerializer
