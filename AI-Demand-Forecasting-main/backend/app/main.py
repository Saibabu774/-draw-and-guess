from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from app.database import engine, Base
Base.metadata.create_all(bind=engine)

# Models import
from app.models import user, dataset, forecast_history, forecast_schedule, report, notification
from app.models import data_quality, organization, organization_user, organization_settings
from app.models import forecast_approval, workflow, workflow_execution, business_target
from app.models import forecast_governance, kpi, notification_preference, organization_announcement, project_permission

# Routers import
from app.routers import (
    auth_router, user_router, dataset_router, analytics_router, forecast_router, 
    report_router, admin_router, notification_router, search_router, inventory_router,
    anomaly_router, retraining_router, revenue_router, insights_router, filter_router,
    ensemble_router, realtime_router, export_router, comparison_router, cache_router,
    automation_router, audit_router, security_router, jwt_security_router, background_router,
    alert_settings_router, project_router, scenario_router, project_activity_router,
    executive_router, ai_insights_engine_router, collaboration_router, dataset_version_router,
    accuracy_router, executive_reporting_router, dashboard_layout_router, project_permission_router,
    organization_router, organization_user_router, forecast_approval_router, workflow_router,
    strategic_planning_router, forecast_governance_router, kpi_router, data_quality_router,
    executive_command_router, notification_center_router
)

app = FastAPI(title="AI Demand Forecasting API", version="3.0.0")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# All Routers Register
app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(dataset_router.router)
app.include_router(analytics_router.router, prefix="/analytics", tags=["Analytics"])  # ✅ prefix add chesa
app.include_router(forecast_router.router)
app.include_router(report_router.router)
app.include_router(admin_router.router)
app.include_router(notification_router.router)
app.include_router(search_router.router)
app.include_router(inventory_router.router)
app.include_router(anomaly_router.router)
app.include_router(retraining_router.router)
app.include_router(revenue_router.router)
app.include_router(insights_router.router)
app.include_router(filter_router.router)
app.include_router(ensemble_router.router)
app.include_router(realtime_router.router)
app.include_router(export_router.router)
app.include_router(comparison_router.router)
app.include_router(cache_router.router)
app.include_router(automation_router.router)
app.include_router(audit_router.router)
app.include_router(security_router.router)
app.include_router(jwt_security_router.router)
app.include_router(background_router.router)
app.include_router(alert_settings_router.router)
app.include_router(project_router.router)
app.include_router(scenario_router.router)
app.include_router(project_activity_router.router)
app.include_router(executive_router.router)
app.include_router(ai_insights_engine_router.router)
app.include_router(collaboration_router.router)
app.include_router(dataset_version_router.router)
app.include_router(accuracy_router.router)
app.include_router(executive_reporting_router.router)
app.include_router(dashboard_layout_router.router)
app.include_router(project_permission_router.router)
app.include_router(organization_router.router)
app.include_router(organization_user_router.router)
app.include_router(forecast_approval_router.router)
app.include_router(workflow_router.router)
app.include_router(strategic_planning_router.router)
app.include_router(forecast_governance_router.router)
app.include_router(kpi_router.router)
app.include_router(data_quality_router.router)
app.include_router(executive_command_router.router)
app.include_router(notification_center_router.router)

@app.get("/")
def home():
    return {"message": "AI Demand Forecasting API Running Successfully", "version": "3.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "application": "AI Demand Forecasting Platform"}