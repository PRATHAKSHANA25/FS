SELECT e.title,
  SUM(resource_type = 'pdf') AS pdf_count,
  SUM(resource_type = 'image') AS image_count,
  SUM(resource_type = 'link') AS link_count
FROM Resources r
JOIN Events e ON r.event_id = e.event_id
GROUP BY r.event_id;
