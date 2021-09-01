from rest_framework import serializers

from .models import Candidate
from .models import Recruiter


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ['id', 'name', 'experience', 'profile']


class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = ['username', 'password']
