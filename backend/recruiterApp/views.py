from rest_framework import viewsets

from .models import Candidate
from .models import Recruiter
from .serializers import CandidateSerializer
from .serializers import RecruiterSerializer


# Create your views here.
class CandidateView(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()


class RecruiterView(viewsets.ModelViewSet):
    serializer_class = RecruiterSerializer
    queryset = Recruiter.objects.all()
