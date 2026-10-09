import { useEffect, useState } from "react";

import MainLayout from "../layout/MainLayout";

import CandidateHeader from "../components/CandidateHeader";
import UploadCandidate from "../components/UploadCandidate";
import CandidateGrid from "../components/CandidateGrid";

import candidateService from "../services/candidateService";

export default function Candidates() {
  const [uploadOpen, setUploadOpen] =
    useState(false);

  const [candidates, setCandidates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [uploadLoading, setUploadLoading] =
    useState(false);

  /*
  =====================================================
  Load Candidates
  =====================================================
  */

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data =
        await candidateService.getCandidates();

      setCandidates(data);
    } catch (error) {
      console.error(
        "Failed to load candidates:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  =====================================================
  View Candidate
  =====================================================
  */

  const handleView = (candidate) => {
    console.log(
      "View Candidate:",
      candidate
    );

    // Later
    // Navigate to Candidate Details page
  };

  /*
  =====================================================
  Delete Candidate
  =====================================================
  */

  const handleDelete = async (
    candidate
  ) => {
    const confirmDelete =
      window.confirm(
        `Delete ${candidate.full_name}?`
      );

    if (!confirmDelete) return;

    try {
      await candidateService.deleteCandidate(
        candidate.id
      );

      fetchCandidates();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Unable to delete candidate."
      );
    }
  };

  /*
=====================================================
Upload Candidate
=====================================================
*/

const handleUpload = async (
  candidateData
) => {

  try {

    setUploadLoading(true);

    const formData =
      new FormData();

    formData.append(
      "full_name",
      candidateData.full_name
    );

    formData.append(
      "email",
      candidateData.email
    );

    formData.append(
      "phone",
      candidateData.phone
    );

    formData.append(
      "file",
      candidateData.file
    );

    await candidateService.uploadCandidate(
      formData
    );

    alert(
     `${candidateData.full_name} uploaded successfully!`
    );

    await fetchCandidates();

    setUploadOpen(false);

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.detail ||
      "Upload failed."
    );

  } finally {

    setUploadLoading(false);

  }

};

  return (
    <MainLayout>
      <div className="space-y-8">

        <CandidateHeader
          uploadOpen={uploadOpen}
          setUploadOpen={setUploadOpen}
        />

        {uploadOpen && (
          <UploadCandidate
            onUpload={handleUpload}
            loading={uploadLoading}
          />
        )}

        {loading ? (
          <div
            className="
              rounded-[28px]
              border
              border-[#EFE8F6]
              bg-[#FCFAFD]
              p-10
              text-center
            "
          >
            <h2
              className="
                text-xl
                font-semibold
                text-slate-600
              "
            >
              Loading candidates...
            </h2>
          </div>
        ) : (
          <CandidateGrid
            candidates={candidates}
            onView={handleView}
            onDelete={handleDelete}
          />
        )}

      </div>
    </MainLayout>
  );
}