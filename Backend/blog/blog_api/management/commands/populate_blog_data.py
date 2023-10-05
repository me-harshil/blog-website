import os
import csv
from django.core.management.base import BaseCommand
from django.utils.safestring import mark_safe
from blog_api.models import BlogData

class Command(BaseCommand):
    help = 'Populate blog_data table from a CSV file'

    def handle(self, *args, **kwargs):
        # Get the path to the CSV file
        current_directory = os.path.dirname(os.path.realpath(__file__))
        csv_file_path = os.path.join(current_directory, 'data.csv')

        # Open and read the CSV file with the appropriate encoding (e.g., 'utf-8')
        with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
            csv_reader = csv.DictReader(csvfile)
            # print(csv_reader)
            for row in csv_reader:
                # Extract data from the CSV columns
                id = int(row['id'])
                title = row['title']
                tag = row['tag']
                author = row['author']
                date = row['date']
                image = row['image']
                description = mark_safe(row['description'])  # Preserve HTML formatting

                # Create a new BlogData object and save it to the database
                BlogData.objects.create(
                    id=id,
                    title=title,
                    tag=tag,
                    author=author,
                    date=date,
                    image=image,
                    description=description
                )

        self.stdout.write(self.style.SUCCESS('Successfully populated blog_data table.'))
