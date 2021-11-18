from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.db import transaction
from rest_framework import status


class PartsView(APIView):
    
    def get(self, request, pk, format=None):
        try:
            parts = Parts.objects.get(pk=pk)
            serializer = PartsSerializers(parts)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)
    
    @transaction.atomic
    def post(self, request):
        serializer = PartsSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def put(self, request, pk, format=None):
        """
        Expects only a validation_message
        """
        try:
            parts = PartsSerializers(Parts.objects.get(pk=pk))
            parts.mpn = request.data.get("mpn")
            parts.mcode = request.data.get("mcode")
            parts.master_id = request.data.get("master_id")
            parts.name = request.data.get("name")
            parts.partlist = request.data.get("partlist")
            parts.save()
            serializer = PartsSerializers(parts)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)        
    
    def delete(self, request, pk):

        try:
            Parts.objects.get(pk=pk).delete()
            return Response({"result":True}, status=204)
        except:
            return Response({"error":True, "message":"Part objects not found"}, status=400)


class PartListView(APIView):
    def get(self, request, pk, format=None):
        try:
            partslist = PartList.objects.get(pk=pk)
            serializer = PartListSerializers(partslist)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)

    @transaction.atomic
    def post(self, request, format=None):
        serializer = PartListSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def put(self, request, pk, format=None):
        try:
            partlist = PartListSerializers(PartList.objects.get(pk=pk))
            partlist.list_name = request.data.get("list_name")
            partlist.roketchip_user.request.data.get("roketchip_user")
            partlist.created_date.request.data.get("created_date")
            partlist.updated_date.request.data.get("updated_date")
            serializer = PartListSerializers(partlist)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)
       
   
    def delete(self, request, pk,format=None):
        try:
            PartList.objects.get(pk=pk).delete()
            return Response({"result":True}, status=204)
        except:
            return Response({"error":True, "message":"Partlist objects not found"}, status=400)
